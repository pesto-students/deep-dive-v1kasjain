const assert = require('assert');
let Schema = null;

function init() {

  const userSchema = new Schema(
    {
      email: { type: String, required: true, unique: true },
      is_active: { type: Boolean, default: true }
    },
    { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } }
  );

  userSchema.pre('save', function(next) {
    return next();
  });
  return userSchema;
}

module.exports = (schema) => {
  assert.ok(schema);
  Schema = schema;
  return init();
};
