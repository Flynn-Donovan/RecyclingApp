// We import the Model so we can talk to MongoDB
const refundRule = require('./refundRule.js');

// This is the logic you are responsible for
exports.postEstimate = async (req, res) => {
  try {
    const { tag, region, moreThanLiter, bottleCount } = req.body;

    // 1. Validation
    if (!region) return res.status(400).json({ message: "Region missing" });
    if (moreThanLiter === undefined) return res.status(400).json({ message: "More than liter flag missing" });
    if (!bottleCount || bottleCount <= 0) return res.status(400).json({ message: "Invalid count" });
    
    // 2. Query Database (The calculateRefund part)
    // Pretend the database found this rule: "In Alberta, bottles under 1L give 0.10"
    const rule = { 
      tag: "bottle", 
      region: "Alberta", 
      moreThanLiter: false, 
      refund: 0.10 // The database should tell us the price!
    };

    if (!rule) return res.status(404).json({ message: "No rule found" });

    // 3. Calculate using the RULE from the database and the COUNT from the user
    const totalRefund = rule.refund * bottleCount;

    // 4. Send Response
    res.status(200).json({
      tag: tag,
      region: region,
      moreThanLiter: moreThanLiter,
      bottleCount: bottleCount, // We return the user's 200 bottles
      refundAmount: totalRefund // We return the calculated money (0.10 * 200 = 20)
    });

  } catch (err) {
    console.log("======= BACKEND CRASH SUMMARY =======");
    console.error(err); 
    console.log("=====================================");
    res.status(500).json({ success: false, errorMessage: err.message });
  }
};