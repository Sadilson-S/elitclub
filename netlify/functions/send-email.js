// Netlify serverless function to send emails
const axios = require('axios');

exports.handler = async function(event, context) {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the incoming JSON data
    const data = JSON.parse(event.body);
    const { name, email, phone, investment } = data;

    // Validate required fields
    if (!name || !email || !phone || !investment) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: 'Missing required fields' })
      };
    }

    // Format the email content
    const emailContent = `
      Nova solicitação de associação ao Elite Club:
      
      Nome Completo: ${name}
      Email: ${email}
      Telefone: ${phone}
      Faixa de Investimento: ${investment}
      
      Data de envio: ${new Date().toLocaleString('pt-BR')}
    `;

    // Use a free email sending service - FormSubmit
    // This service allows you to send emails without API keys
    // Just send a POST request to their endpoint
    const formData = new URLSearchParams();
    formData.append('email', 'sadilsonsamuel4@gmail.com'); // Your email address
    formData.append('subject', 'Nova solicitação de associação ao Elite Club');
    formData.append('message', emailContent);
    formData.append('replyTo', email); // Set reply-to as the user's email

    // Send the email using FormSubmit service
    const response = await axios.post(
      'https://formsubmit.co/ajax/sadilsonsamuel4@gmail.com',
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );

    // Return success response
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Email enviado com sucesso!',
        data: response.data
      })
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    // Return error response
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Erro ao enviar email',
        error: error.message
      })
    };
  }
};
