import {
    assertEquals,
  } from './test.deps.js';
  
  Deno.test("Test Assert", () => {
    assertEquals("Hello", "Hello");
  });