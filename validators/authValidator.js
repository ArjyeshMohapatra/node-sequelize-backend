const { z } = require('zod');

const registerSchema = z.object({
    body: z.object({
        first_name: z.string().min(4, 'First name must be at least 3 characters'),
        last_name: z.string().min(4, 'Last name must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
        password: z.string().min(6, 'Length of password should be greater or equal to 6'),
        phone_no: z.string().regex(/^\+?[1-9]\d{9,14}$/, 'Invalid phone number format'),
        address: z.string().min(1, 'Address is required'),
        status: z.enum(['active', 'inactive'], {
            errorMap: () => ({ message: "Status must be either 'active' or 'inactive'" }),
        }),
        salary: z.number().positive('Salary must be a positive number'),
    })
});

const loginSchema = z.object({
    body: z.object({
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password is required'),
    }),
  });

const refreshTokenSchema = z.object({
    body: z.object({
        refreshToken: z.string().min(1, 'Refresh token is required'),
    }),
});
  
module.exports = { registerSchema, loginSchema, refreshTokenSchema };