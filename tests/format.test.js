import { test } from "node:test";
import assert from "node:assert/strict";
import { numberLocale, formatNumber, formatMoney, formatPercent, parseNumber, currencySymbol } from "../js/format.js";

test("numberLocale: English is British, regional Arabic is kept", () => {
  assert.equal(numberLocale("en"), "en-GB-u-nu-latn");
  assert.equal(numberLocale("en-US"), "en-US-u-nu-latn");
  assert.equal(numberLocale("ar"), "ar-u-nu-latn");
  assert.equal(numberLocale("ar-SA", "arab"), "ar-SA-u-nu-arab");
});

test("formatNumber: either digit set", () => {
  assert.equal(formatNumber(108000, { lang: "en" }), "108,000");
  assert.equal(formatNumber(108000, { lang: "ar", numerals: "arab" }), "١٠٨٬٠٠٠");
});

test("formatMoney: the symbol first, in both languages", () => {
  assert.equal(formatMoney(6010), "£6,010");
  assert.equal(formatMoney(6010, "GBP", { lang: "ar" }), "£6,010");
  assert.equal(formatMoney(6010, "GBP", { lang: "ar", numerals: "arab" }), "£٦٬٠١٠");
  assert.equal(formatMoney(-6010), "−£6,010");
});

test("formatMoney: a code without a symbol is spaced", () => {
  assert.equal(currencySymbol("SAR"), "SAR");
  assert.equal(formatMoney(100, "SAR"), "SAR 100");
});

test("formatMoney: what's shown, rounded, decides the sign", () => {
  assert.equal(formatMoney(-0.4), "£0");
  assert.equal(formatMoney(5, "GBP", { signDisplay: "always" }), "+£5");
  assert.equal(formatMoney(0, "GBP", { signDisplay: "exceptZero" }), "£0");
  assert.equal(formatMoney(-5, "GBP", { signDisplay: "never" }), "£5");
});

test("formatMoney: fractions show all their digits", () => {
  assert.equal(formatMoney(12.5, "GBP", { maximumFractionDigits: 2 }), "£12.50");
  assert.equal(formatMoney(12.5, "GBP", { maximumFractionDigits: 2, minimumFractionDigits: 0 }), "£12.5");
});

test("formatPercent", () => {
  assert.equal(formatPercent(0.62, { lang: "en" }), "62%");
});

test("parseNumber: typed numbers, in either digit set", () => {
  assert.equal(parseNumber("108,000"), 108000);
  assert.equal(parseNumber("١٠٨٬٠٠٠"), 108000);
  assert.equal(parseNumber("۱۰۸"), 108);
  assert.equal(parseNumber("108k"), 108000);
  assert.equal(parseNumber("1.5m"), 1500000);
  assert.equal(parseNumber("٣٫٥"), 3.5);
  assert.ok(Number.isNaN(parseNumber("abc")));
});

test("parseNumber reads this module's own output", () => {
  for (const v of [-5, 0, 6010, -6010, 12.5]) {
    assert.equal(parseNumber(formatNumber(v, { lang: "ar" })), v, `ar ${v}`);
    assert.equal(parseNumber(formatNumber(v, { lang: "ar", numerals: "arab" })), v, `ar arab ${v}`);
    assert.equal(parseNumber(formatMoney(v, "GBP", { maximumFractionDigits: 2 })), v, `money ${v}`);
  }
  assert.equal(parseNumber(formatMoney(100, "SAR")), 100);
  assert.equal(parseNumber("⁦£6,010⁩"), 6010);
});
