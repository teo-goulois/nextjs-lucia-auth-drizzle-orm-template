import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  code: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  code,
}) => (
  <div>
    <h1>Welcome, {firstName}!</h1>
    <p>
      Your email verification code is: <strong>{code}</strong>
    </p>
  </div>
);
