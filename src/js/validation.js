var app = (function () {

    "use strict";
    if (document.getElementById('form') !== null) {
        document.getElementById('form').addEventListener('submit', function (e) {
            e.preventDefault();
            e.stopPropagation();
            return validate();
        })

        function validate() {
            var all_fields = makeArray(document.form);
            var isValid = validateInput.apply(this, all_fields); // makes the function take an array of arguments
            return isValid;
        }
        // primary functions

        function validateInput(el) {
            if (typeof el === "undefined") {
                return false;
            } else {
                var args = makeArray(arguments);
                var value;
                var checked;
                var radio_checked;
                args.forEach(function (el) {
                    if (el.type == "checkbox") {
                        checked = isChecked(el, checked);
                    } else if (el.type == "radio") {
                        radio_checked = isChecked(el, radio_checked);
                    } else if (el.type == "select-multiple") {
                        el.selectedOptions.length === 2 ? noErrMessage(el) : displayErrMessage(el);
                    } else if (el.type == "textarea") {
                        //doesn't need validated;
                    } else {
                        value = Boolean(el.value);
                        if (value === false) {
                            displayErrMessage(el);
                        } else {
                            noErrMessage(el)
                        }
                    }
                });
                return value;
            }
        }

        function displayErrMessage(el) {
            el = document.getElementById(el.classList[0] + 'Err')
            if (el) {
                el.classList.add('error-message');
                el.classList.remove('hidden');
            }
        }

        function noErrMessage(el) {
            el = document.getElementById(el.classList[0] + 'Err');
            if (el) {
                el.classList.add('hidden');
                el.classList.remove('error-message');
            }
        }

        function isChecked(el, checked) {
            // set initial value if undefined
            if (typeof checked == "undefined") {
                checked = false;
            }
            if (el.checked) {
                checked = true;
            }
            if (checked) {
                noErrMessage(el);
            } else {
                displayErrMessage(el);
            }
            return checked;
        }

        // utils
        function makeArray(arrLike) {
            // makes an array like object a true array
            return [].slice.call(arrLike);
        }

        return app;

    }


})();