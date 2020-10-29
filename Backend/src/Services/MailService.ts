var nodemailer = require('nodemailer');
import { user, password } from '../adapters/APIKeys/mailKeys';

var mail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user,
    pass: password,
  },
});

export const sendImageToOwner = (recipient: string, imagePath: string) => {
  var mailOptions = {
    from: user,
    to: recipient,
    subject: 'DH Project Image OCR',
    text:
      'Please find uploaded image and CSV attached.\nNote - This CSV contains raw data only.\nUpdated content will be saved to db after user submission.',
    attachments: [{ path: imagePath }, { path: './image.csv' }],
  };

  mail.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to owner: ' + info.response);
    }
  });
};

export const sendMailToOwner = (recipient: string) => {
  var mailOptions = {
    from: user,
    to: recipient,
    subject: 'DH Project Image OCR',
    text: 'Please find updated CSV attached.\n',
    attachments: [{ path: './csvWriterWithUpdatedContent.csv' }],
  };

  mail.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to owner: ' + info.response);
    }
  });
};

export const sendMailToContributer = (recipient: string, name: string) => {
  var mailOptions = {
    from: user,
    to: recipient,
    subject: `"Mask Please" Image OCR - Thanks ${name} for the contribution!`,
    text: `Hi ${name},\nWe recived your image and content contribution.\n\nThank you,\n"Mask Please" Image OCR Team.`,
  };

  mail.sendMail(mailOptions, function (error: any, info: any) {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent to contributer: ' + info.response);
    }
  });
};
