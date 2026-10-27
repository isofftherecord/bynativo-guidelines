"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure } from "./src/sanity/structure";

const shared = {
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure }), visionTool({ defaultApiVersion: apiVersion })],
};

export default defineConfig([
  {
    ...shared,
    name: "default",
    title: "byNativo Guidelines",
    basePath: "/studio",
  },
  {
    ...shared,
    name: "801",
    title: "801 Brickell",
    basePath: "/studio/801",
  },
  {
    ...shared,
    name: "core-wynwood",
    title: "Core Wynwood",
    basePath: "/studio/core-wynwood",
  },
]);
