export function getEntityCombinedSelectionSchema(field?: string) {
  return {
    type: "expandable",
    title: `Combined ${field || "Grid"} Entity (positive & negative values)`,
    schema: [
      {
        name: "entity",
        selector: { entity: {} },
      },
    ],
  } as const;
}

export function getEntitySeparatedSelectionSchema(field?: string) {
  return {
    type: "expandable",
    title: `Separated ${field || "Grid"} Entities (One for production, one for consumption)`,
    name: "entity",
    schema: [
      {
        name: "consumption",
        label: "Consumption Entity",
        selector: { entity: {} },
      },
      {
        name: "production",
        label: "Production Entity",
        selector: { entity: {} },
      },
    ],
  } as const;
}

export const customColorsSchema = {
  name: "color",
  title: "Custom Colors",
  type: "expandable",
  schema: [
    {
      type: "grid",
      column_min_width: "200px",
      schema: [
        {
          name: "consumption",
          label: "Consumption",
          selector: { color_rgb: {} },
        },
        {
          name: "production",
          label: "Production",
          selector: { color_rgb: {} },
        },
      ],
    },
  ],
} as const;

export const secondaryInfoSchema = [
  {
    name: "entity",
    selector: { entity: {} },
  },
  {
    name: "template",
    label: "Template (overrides entity, save to update)",
    selector: { template: {} },
  },
  {
    type: "grid",
    column_min_width: "200px",
    schema: [
      { name: "icon", selector: { icon: {} } },
      { name: "unit_of_measurement", label: "Unit of Measurement", selector: { text: {} } },
      { name: "color_value", label: "Color Value", selector: { boolean: {} } },
      { name: "unit_white_space", label: "Unit White Space", selector: { boolean: {} } },
      { name: "display_zero", label: "Display Zero", selector: { boolean: {} } },
      { name: "display_zero_tolerance", label: "Display Zero Tolerance", selector: { number: { mode: "box", min: 0, max: 1000000, step: 0.1 } } },
    ],
  },
] as const;

const batteryOrGridMainConfigSchema = [
  {
    name: "color_icon",
    label: "Color of Icon",
    selector: {
      select: {
        options: [
          { value: false, label: "Do not Color" },
          { value: true, label: "Color dynamically" },
          { value: "production", label: "Production" },
          { value: "consumption", label: "Consumption" },
        ],
        custom_value: true,
      },
    },
  },
  {
    name: "color_circle",
    label: "Color of Circle",
    selector: {
      select: {
        options: [
          { value: true, label: "Color dynamically" },
          { value: false, label: "Consumption" },
          { value: "production", label: "Production" },
        ],
        custom_value: true,
      },
    },
  },
  {
    name: "display_zero_tolerance",
    label: "Display Zero Tolerance",
    selector: {
      number: {
        min: 0,
        max: 1000000,
        step: 1,
        mode: "box",
      },
    },
  },
  {
    name: "display_state",
    label: "Display State",
    selector: {
      select: {
        options: [
          { value: "two_way", label: "Two Way" },
          { value: "one_way", label: "One Way" },
          { value: "one_way_no_zero", label: "One Way (Show Zero)" },
        ],
        custom_value: true,
      },
    },
  },
] as const;

export function getBaseMainConfigSchema(field?: string) {
  const result: any = {
    type: "grid",
    column_min_width: "200px",
    schema: [
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
    ],
  };
  if (field === "battery" || field === "grid") {
    result.schema.push(...batteryOrGridMainConfigSchema);
  }
  return result;
}
