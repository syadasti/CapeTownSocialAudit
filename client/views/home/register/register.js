var trimInput = function(val) {
  return val.replace(/^\s*|\s*$/g, "");
}


  var isValidPassword = function(val, field) {
      if (val.length = 6) {
        return true;
      } else {
        // Session.set('displayMessage', 'Error &amp; Too short.')
        return false;
      }
    }

Template.register.events({
  'submit #register-form' : function(e, t){
      e.preventDefault();
      var email = t.find('#register-email').value
        , password = t.find('#register-password').value;

        email = trimInput(email);
        password = trimInput(password);

        // Trim and validate the input

        if (isValidPassword(password)) // &amp;&amp; other validations)
        {
          Accounts.createUser({
            email: email,
            password : password},
            function(err){
              if (err) {
                console.log(err)
                FlashMessages.sendError(err.reason);
                return;
              }
              if (Router.current().route.name === 'accounts') {
                console.log("User logged in");
                FlashMessages.sendSuccess("Successfully logged in");
                return Router.go("/staff");
              }

            });
        } else {
          FlashMessages.sendError("Error. Password must be at least 6 characters.");
          return;
        }


      return false;
    }
  });
