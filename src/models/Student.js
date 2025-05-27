const { pool } = require('../config/database');
const bcrypt = require('bcrypt');

class Student {
  static async create(studentData) {
    const { nome_completo, usuario_acesso, senha, email_aluno, observacao } = studentData;
    const saltRounds = 10;
    const senha_hash = await bcrypt.hash(senha, saltRounds);

    const query = `
      INSERT INTO alunos (nome_completo, usuario_acesso, senha_hash, email_aluno, observacao)
      VALUES (?, ?, ?, ?, ?)
    `;

    try {
      const [result] = await pool.execute(query, [
        nome_completo,
        usuario_acesso,
        senha_hash,
        email_aluno,
        observacao || null
      ]);

      const [students] = await pool.execute(
        'SELECT id_aluno, nome_completo, usuario_acesso, email_aluno, data_cadastro FROM alunos WHERE id_aluno = ?',
        [result.insertId]
      );

      const student = students[0];

      return {
        success: true,
        message: 'Aluno registrado com sucesso',
        studentId: student.id_aluno,
        nome_completo: student.nome_completo,
        usuario_acesso: student.usuario_acesso,
        email_aluno: student.email_aluno,
        data_cadastro: student.data_cadastro
      };
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        if (error.message.includes('usuario_acesso')) {
          throw new Error('Nome de usuário já existe');
        }
        if (error.message.includes('email_aluno')) {
          throw new Error('Email já existe');
        }
      }
      throw error;
    }
  }
}

module.exports = Student; 