function sendSuccess(res) {
  res.status(200).json({
    success: 1,
    message: "success"
  })
}

module.exports = sendSuccess;
