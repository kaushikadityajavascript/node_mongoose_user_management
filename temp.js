db.createCollection("non-fiction", {
  validator: {
    $jsonSchema: {
      required: ["name", "price", "author"],
      properties: {
        name: {
          bsonType: "string",
          description: "must be a string",
        },
        price: {
          bsonType: "number",
          description: "must be a number",
        },
        author: {
          bsonType: "array",
          description: "must be an array ",
          items: {
            bsonType: "object",
            required: ["name", "email"],
          },
        },
      },
    },
  },
  validationAction: "error",
});

db.runCommand({
  colMod: "nonFiction",
});
