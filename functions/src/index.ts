import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as nodemailer from "nodemailer";

const app = express();
app.use(cors()); // Cross-Origin Resource Sharing problemlerınden kaçınmak için.

//  Maili gönderecek olan expressjs api endpoint
app.get("/", (req, res) => {
  sendMail(res);
});

const sendMail = (res: any) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "ag*****@gmail.com", // gmail id
      pass: "*******" //gmail şifre
    }
  });
  transporter
    .sendMail({
      from: '"Agha Huseynov" <ag******@gmail.com>', // gönderici maili
      to: "agahuseynov@hotmail.com", // alacaklar mail listesi
      subject: "Mediumdan selamlar ✔", // Konu
      text: "Selam bir test mailidir!", // mail içerik
      html: "<b>Selam bir test mailidir fakat html mail :) </b>" // html içeriği
    })
    .then(() => res.send("Gönderildi!"))
    .catch(error => res.send(`Hata var! : ${error}`));
};

exports.sendmail = functions.https.onRequest(app); // sendmail servisini dışarıya açıyoruz

// servisimizin çalışıp çalışmadığını kontrol ediyoruz fakat burada express js den faydalanmadık düz yazdık :)
exports.ping = functions.https.onRequest((request, response) => {
  response.send("Evet çalışıyor...");
});
