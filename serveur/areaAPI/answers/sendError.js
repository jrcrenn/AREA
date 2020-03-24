function sendSuccess(res, msg) {

  res.status(500).json({
    success: 0,
    message: msg
  })
}

module.exports = sendSuccess;