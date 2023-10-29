import userModel from "../../DB/model/user.model.js"; // Import the user model
import { default as jwt } from "jsonwebtoken"; // JWT for token generation
import { default as bcryptjs } from "bcryptjs"; // bcrypt for password hashing
import internalServerError from "../../utils/internal_server_error.js"; // Function for handling internal server errors

// JWT token expiration configuration
const jwtExpiration = {
  string: "8h", // Expiration time as a string
  seconds: () => {
    return Math.floor(Date.now() / 1000) + 8 * 60 * 60; // Calculate token expiration time in seconds
  },
};

/**
 * Handles user signup.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const signup = async (req, res) => {
  try {
    const { name, userName, password } = req.body;

    const users = await userModel.find().select("userName");

    const usersWithSameUserName = users.filter(
      (user) => user.userName === userName
    );

    if (usersWithSameUserName.length > 0) {
      return res.status(409).json({ message: "Username is not available" }); // 409: Conflict
    }

    // Hash the password
    const hashedPassword = await bcryptjs.hash(
      password,
      parseInt(process.env.SALT_ROUNDS)
    );

    await userModel.create({ name, userName, password: hashedPassword });

    return res.status(201).json({ message: "Account created successfully" }); // 201: Created
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Handles user login.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;

    const foundUser = await userModel.findOne({ userName });

    if (!foundUser) {
      return res.status(404).json({ message: "Invalid username or password" }); // 404: Not Found
    }

    // Compare the password
    const match = await bcryptjs.compare(password, foundUser.password);

    if (!match) {
      return res.status(404).json({ message: "Invalid username or password" }); // 404: Not Found
    }

    // Update user login status and generate JWT token
    foundUser.isLoggedIn = true;
    foundUser.LoggedInAt = Date.now();
    await foundUser.save();

    const token = jwt.sign(
      {
        id: foundUser._id,
        isSignedIn: true,
        jwtExpiration: jwtExpiration.seconds(),
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: jwtExpiration.string }
    );

    return res.status(201).json({ message: "Login successful", token }); // 201: Created
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};

/**
 * Handles user logout.
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 */
export const logout = async (req, res) => {
  try {
    // Update user logout details
    await userModel.findOneAndUpdate(
      { _id: req.user._id },
      {
        LoggedOutAt: Date.now(),
        LoggedInAt: null,
        isLoggedIn: false,
      }
    );

    res.status(200).json({ message: "Logged out successfully" }); // 200: OK
  } catch (error) {
    internalServerError(res, error); // Handling internal server error
  }
};
