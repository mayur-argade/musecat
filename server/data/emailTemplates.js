exports.userSignupEmail = (username, token) => {
    return `
        <html>
        <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
        <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px">
          <tr style="width:100%">
            <td>
              <img alt="Muscat-Where-TO" src="https://omanwhereto.com/images/logo/logo-main.png" width="42" height="42" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" />
              <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Dear ${username}</h1>
              <p>To complete your registration and activate your account, please click on the following link:</p>
              <table style="padding:27px 0 27px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                <tbody>
                  <tr>
                    <td><a href="https://www.omanwhereto.com/user/verify-account/${token}" target="_blank" style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;line-height:100%;max-width:100%;padding:11px 23px"><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%;mso-text-raise:16.5" hidden>&nbsp;</i><![endif]--></span><span style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:8.25px">Login to Muscat Where to</span><span><!--[if mso]><i style="letter-spacing: 23px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]--></span></a></td>
                  </tr>
                </tbody>
              </table>
              <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">This link and code will only be valid for the next 10 minutes. If the link does not work, you can use the login verification code directly:</p>
              <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" /><a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="https://muscatwhereto.com">Muscat Where To</a>
            </td>
          </tr>
        </table>
      </body>
        </html>
    `;
};

exports.vendorSignupEmail = (firstname, lastname, token) => {
    return `
<html>
<body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
                <table align="center" role="presentation" cellSpacing="0" cellPadding="0" border="0" width="100%" style="max-width:37.5em;margin:0 auto;padding:20px 0 48px;width:560px">
                    <tr style="width:100%">
                        <td>
                            <img alt="Muscat-Where-TO" src="https://omanwhereto.com/images/logo/logo-main.png" width="42" height="42" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" />
                            <h1 style="font-size:24px;letter-spacing:-0.5px;line-height:1.3;font-weight:400;color:#484848;padding:17px 0 0">Dear ${firstname} ${lastname}</h1>
                            <p>Thank you for registering vendor account with muscatwhereto.com. To complete your registration and activate your account, please click on the following link:</p>
                            <table style="padding:27px 0 27px" align="center" border="0" cellPadding="0" cellSpacing="0" role="presentation" width="100%">
                                <tbody>
                                    <tr>
                                        <td>
                                            <a href="https://www.omanwhereto.com/vendor/verify-account/${token}" target="_blank" style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;line-height:100%;max-width:100%;padding:11px 23px">
                                                <span></span><span style="background-color:#5e6ad2;border-radius:3px;font-weight:600;color:#fff;font-size:15px;text-decoration:none;text-align:center;display:inline-block;p-x:23px;p-y:11px;max-width:100%;line-height:120%;text-transform:none;mso-padding-alt:0px;mso-text-raise:8.25px">Verify Vendor Account</span><span></span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <p style="font-size:15px;line-height:1.4;margin:0 0 15px;color:#3c4149">This link will only be valid for the next 10 minutes.</p>
<hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#dfe1e4;margin:42px 0 26px" />
                            <a target="_blank" style="color:#b4becc;text-decoration:none;font-size:14px" href="https://muscatwhereto.com">Best regards,<br>Muscat Where To</a>
                        </td>
                    </tr>
                </table>
            </body>
</html>
`
}

exports.contactUsEmail = (firstname, lastname, email, message) => {
    return `
    <html>
    <body>
    <table bgcolor="#fafafa" style=" width: 100%!important; height: 100%; background-color: #fafafa; padding: 20px; font-family: 'Helvetica Neue', 'Helvetica', Helvetica, Arial, 'Lucida Grande', sans-serif;  font-size: 100%; line-height: 1.6;">
    <tr>
    <td></td>
    <td bgcolor="#FFFFFF" style="border: 1px solid #eeeeee; background-color: #ffffff; border-radius:5px; display:block!important; max-width:600px!important; margin:0 auto!important; clear:both!important;"><div style="padding:20px; max-width:600px; margin:0 auto; display:block;">
    <table style="width: 100%;">
    <tr>
    <td><p style="text-align: center; display: block;  padding-bottom:20px;  margin-bottom:20px; border-bottom:1px solid #dddddd;"><img alt="Muscat-Where-TO" src="https://omanwhereto.com/images/logo/logo-main.png" width="42" height="42" style="display:block;outline:none;border:none;text-decoration:none;border-radius:21px;width:42px;height:42px" /></p>
    <p style="margin-bottom: 10px; font-weight: normal; font-size:16px; color: #333333;">Name :- ${firstname} ${lastname}</p>
    <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;">Email :- ${email}</h2>
    <h2 style="font-weight: 200; font-size: 16px; margin: 20px 0; color: #333333;">Message :- ${message}</h2>
    <p style="text-align: center; display: block; padding-top:20px; font-weight: bold; margin-top:30px; color: #666666; border-top:1px solid #dddddd;">Muscat Where To</p></td>
    </tr>
    </table>
    </div></td>
    <td></td>
    </tr>
    </table>
    </body>
    </html>
`
}