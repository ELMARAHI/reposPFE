  $(document).ready(function () {
            $('.theme-change').click(function (e) {
                var theme = e.target.getAttribute('data-theme');
                console.log(theme);
                var css = document.getElementById('notifyTheme');
                switch (theme) {
                    case 'md':
                        css.setAttribute('href', 'styles/css/angular-notify-material.min.css');
                        $('.theme-select button').removeClass('active');
                        $(e.target).addClass('active');
                        break;
                    case 'flat':
                        css.setAttribute('href', 'styles/css/angular-notify-flat.min.css');
                        $('.theme-select button').removeClass('active');
                        $(e.target).addClass('active');
                        break;
                    case 'bordered':
                        css.setAttribute('href', 'styles/css/angular-notify-bordered.min.css');
                        $('.theme-select button').removeClass('active');
                        $(e.target).addClass('active');
                        break;
                    default:
                        css.setAttribute('href', 'styles/css/angular-notify-texture.min.css');
                        $('.theme-select button').removeClass('active');
                        $(e.target).addClass('active');
                }
            });
            
        });