export class Api{
    constructor(options) {
        // тело конструктора
      }

    getInitialCards() {
        return fetch('https://mesto.nomoreparties.co/v1/cohort-66', {
          headers: {
            authorization: 'fef5ea78-b931-498d-bcf8-69e7812850f6'
          }
        })
          .then(res => {
            if (res.ok) {
              return res.json();
            }
          });
      } 








}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
    headers: {
      authorization: 'fef5ea78-b931-498d-bcf8-69e7812850f6',
      'Content-Type': 'application/json'
    }
  }); 