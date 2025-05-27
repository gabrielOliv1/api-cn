document.getElementById('studentForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        nome_completo: document.getElementById('nome_completo').value,
        usuario_acesso: document.getElementById('usuario_acesso').value,
        senha: document.getElementById('senha').value,
        email_aluno: document.getElementById('email_aluno').value,
        observacao: document.getElementById('observacao').value
    };

    if (!formData.nome_completo || !formData.usuario_acesso || !formData.senha || !formData.email_aluno) {
        showMessage('Todos os campos são obrigatórios, exceto Observações', 'error');
        return;
    }

    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(formData.email_aluno)) {
        showMessage('Formato de email inválido', 'error');
        return;
    }

    if (formData.usuario_acesso.length < 3 || formData.usuario_acesso.length > 50) {
        showMessage('Nome de usuário deve ter entre 3 e 50 caracteres', 'error');
        return;
    }

    if (formData.senha.length < 6) {
        showMessage('A senha deve ter pelo menos 6 caracteres', 'error');
        return;
    }

    if (formData.nome_completo.length < 3 || formData.nome_completo.length > 100) {
        showMessage('Nome completo deve ter entre 3 e 100 caracteres', 'error');
        return;
    }

    try {
        const response = await fetch('/api/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (response.ok) {
            showMessage(`${data.message}! ID do aluno: ${data.studentId}`, 'success');
            document.getElementById('studentForm').reset();
        } else {
            showMessage(data.message || 'Falha no registro', 'error');
        }
    } catch (error) {
        showMessage('Erro ao conectar com o servidor', 'error');
    }
});

function showMessage(message, type) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
    messageDiv.style.color = type === 'success' ? 'green' : 'red';
} 