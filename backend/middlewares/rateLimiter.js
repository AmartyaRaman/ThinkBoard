import ratelimit from "../upstash.js";

const rateLimiter = async(req, res, next) => {

  try {
    // inplace of my-limit-key, we generally use userId so only the malicious user gets blocked
    const {success} = await ratelimit.limit("my-limit-key");

    if (!success) {
      return res.status(429).json({message: "Too many request, please try again later"});
    }
    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
}

export default rateLimiter;