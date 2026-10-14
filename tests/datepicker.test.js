import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDate, formatDate, weekStart, monthGrid, step } from "../js/datepicker.js";

test("typed dates are read day first, in either digit set", () => {
  assert.equal(parseDate("30/11/2026"), "2026-11-30");
  assert.equal(parseDate("٣٠/١١/٢٠٢٦"), "2026-11-30");
  assert.equal(parseDate("۳۰/۱۱/۲۰۲۶"), "2026-11-30"); // Persian digits, as some keyboards type
  assert.equal(parseDate("30-11-26"), "2026-11-30");
  assert.equal(parseDate(" 1.2.2027 "), "2027-02-01");
  assert.equal(parseDate("2026-11-30"), "2026-11-30");
});

test("dates that don't exist aren't read", () => {
  assert.equal(parseDate("31/4/2026"), null);
  assert.equal(parseDate("29/2/2026"), null);
  assert.equal(parseDate("29/2/2028"), "2028-02-29");
  assert.equal(parseDate("2026-02-30"), null);
  assert.equal(parseDate("30/11"), null);
  assert.equal(parseDate(""), null);
});

test("formatDate is written in the language and digits, and read back", () => {
  assert.equal(formatDate("2026-11-30", { lang: "en" }), "30/11/2026");
  const ar = formatDate("2026-11-30", { lang: "ar", numerals: "arab" });
  assert.match(ar, /٣٠.*١١.*٢٠٢٦/);
  assert.equal(parseDate(ar), "2026-11-30");
  assert.equal(parseDate(formatDate("2026-11-30", { lang: "ar" })), "2026-11-30");
  // Gregorian, even where the language's default calendar isn't.
  assert.match(formatDate("2026-11-30", { lang: "ar-SA" }), /2026/);
});

test("the week starts where the language starts it", () => {
  assert.equal(weekStart("en"), 1); // Monday (en-GB)
  assert.equal(weekStart("ar"), 6); // Saturday
  assert.equal(weekStart("en-US"), 0); // Sunday
});

test("a month's grid starts on the week's first day", () => {
  // 1 November 2026 is a Sunday.
  const mon = monthGrid(2026, 10, 1);
  assert.deepEqual(mon[0], [null, null, null, null, null, null, "2026-11-01"]);
  assert.equal(mon.at(-1).filter(Boolean).at(-1), "2026-11-30");
  const sat = monthGrid(2026, 10, 6);
  assert.deepEqual(sat[0].slice(0, 2), [null, "2026-11-01"]);
  assert.ok([...mon, ...sat].every((w) => w.length === 7));
});

test("keys move along the reading direction", () => {
  assert.equal(step("2026-11-30", "ArrowRight"), "2026-12-01");
  assert.equal(step("2026-11-30", "ArrowRight", { rtl: true }), "2026-11-29");
  assert.equal(step("2026-11-30", "ArrowLeft", { rtl: true }), "2026-12-01");
  assert.equal(step("2026-11-30", "ArrowDown"), "2026-12-07");
  assert.equal(step("2026-11-30", "ArrowUp"), "2026-11-23");
});

test("Home and End go to the ends of the language's week", () => {
  // Wednesday 25 November 2026.
  assert.equal(step("2026-11-25", "Home", { start: 1 }), "2026-11-23"); // Monday
  assert.equal(step("2026-11-25", "End", { start: 1 }), "2026-11-29"); // Sunday
  assert.equal(step("2026-11-25", "Home", { start: 6 }), "2026-11-21"); // Saturday
  assert.equal(step("2026-11-25", "End", { start: 6 }), "2026-11-27"); // Friday
});

test("Page keys move by month, or by year with Shift, keeping the day where it can", () => {
  assert.equal(step("2026-01-31", "PageDown"), "2026-02-28");
  assert.equal(step("2026-03-31", "PageUp"), "2026-02-28");
  assert.equal(step("2028-02-29", "PageDown", { shift: true }), "2029-02-28");
  assert.equal(step("2026-11-30", "PageUp", { shift: true }), "2025-11-30");
  assert.equal(step("2026-11-30", "Tab"), null);
});
