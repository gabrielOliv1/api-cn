const validateStudent = (req, res, next) => {
  const { nome_completo, usuario_acesso, senha, email_aluno } = req.body;

  if (!nome_completo || !usuario_acesso || !senha || !email_aluno) {
    return res.status(400).json({
      success: false,
      message: 'All fields are required except observacao'
    });
  }

  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  if (!emailRegex.test(email_aluno)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid email format'
    });
  }

  if (usuario_acesso.length < 3 || usuario_acesso.length > 50) {
    return res.status(400).json({
      success: false,
      message: 'Username must be between 3 and 50 characters'
    });
  }

  if (senha.length < 6) {
    return res.status(400).json({
      success: false,
      message: 'Password must be at least 6 characters long'
    });
  }

  if (nome_completo.length < 3 || nome_completo.length > 100) {
    return res.status(400).json({
      success: false,
      message: 'Full name must be between 3 and 100 characters'
    });
  }

  next();
};

module.exports = validateStudent; 