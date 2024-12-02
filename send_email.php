<?php
// Include PHPMailer files
require 'phpmailer/PHPMailer-master/src/Exception.php';
require 'phpmailer/PHPMailer-master/src/PHPMailer.php';
require 'phpmailer/PHPMailer-master/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $message = $_POST['message'];

    // Create a new PHPMailer object
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com'; // Set your SMTP server (e.g., smtp.gmail.com)
        $mail->SMTPAuth = true;
        $mail->Username = 'udenwojos@gmail.com'; // Your SMTP email address
        $mail->Password = 'onwu anoa redz dbde'; // Your email password or app-specific password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port = 587;

        // Recipients
        $mail->setFrom($email, $name, $phone);
        $mail->addAddress('udenwojos@gmail.com'); // Set recipient email address

        // Content
        $mail->isHTML(true);
        $mail->Subject = 'New Contact Form Submission';
        $mail->Body = "<p>You have received a new message from: <strong>$name</strong></p>
                        <p><strong>Email:</strong> $email</p>
                        <p><strong>Phone Number:</strong> $phone</p>
                        <p><strong>Message:</strong><br>$message</p>";
        $mail->AltBody = "You have received a new message from: $name\nEmail: $email\nPhone Number: $phone\nMessage: $message";

        // Send the email
        $mail->send();
        echo 'Message has been sent successfully';
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
?>
