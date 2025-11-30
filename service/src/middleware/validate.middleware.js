/** Capitalize first letter helper */
const capitalize = (str) =>
  str.charAt(0).toUpperCase() + str.slice(1);

/** Validation middleware */
export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    const errors = error.details.map((detail) => {
      /** Clean up quotes */
      let message = detail.message.replace(/["]+/g, "");

      /** Safely extract and normalize field name */
      const rawField =
        detail.context?.label ??
        detail.path?.[0] ??
        "Field";
      const fieldName = String(rawField);

      /** Capitalize field name */
      const regex = new RegExp(`^${fieldName}`, "i");
      message = message.replace(
        regex,
        capitalize(fieldName),
      );
      return message;
    });

    res.status(400).json({
      message: "Validation failed",
      errors,
    });
    return;
  }

  req.body = value;
  next();
};
