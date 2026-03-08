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
    const rule = {tag: "bottle", region: "Alberta", moreThanLiter: false, bottleCount: 123 }

    if (!moreThanLiter) {refundPerBottle = 0.1;}
    else if (region == "Alberta") {
      refundPerBottle = 0.25;
    }


    if (!rule) return res.status(404).json({ message: "No rule found" });
    if (moreThanLiter == true) {

    }

    // 3. Send Response
    res.status(200).json({
      tag,
      region,
      moreThanLiter,
      bottleCount,
      refundAmount:
    });

  } catch (err) {
  // This prints to your VS Code terminal (The "Black Box" recorder)
  console.log("======= BACKEND CRASH SUMMARY =======");
  console.error(err); 
  console.log("=====================================");

  // This sends the specific error message back to Thunder Client
  res.status(500).json({ 
    success: false,
    errorName: err.name,
    errorMessage: err.message,
    stack: err.stack // This tells you exactly which LINE number failed
  });
}
};