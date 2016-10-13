/**
 * Created by tysonbattistella on 2016-10-13.
 */

CKEDITOR.plugins.add('tokenUserAutoFill', {
    icons: 'users',
    init: function(editor){
        editor.addCommand('tuAutoFill', {
            exec: function(editor){

                function buildLink(tokenUser){
                    return String.format('<li><a href="/token/{0}/">{1}</a></li>', tokenUser.username, tokenUser.display_name)
                }

                var url = '/api/v1/identities/tokens/';
                var tokenUsers = [];

                $.get(url)
                    .done(function(data){
                        var results = data.results;
                        _.forEach(results, function(tokenUser){
                            tokenUsers.push(tokenUser);
                        });
                    })
                    .always(function(){
                        editor.insertHtml('<ul>');
                        for (var i = 0; i < tokenUsers.length; i++){
                            editor.insertHtml(buildLink(tokenUsers[i]));
                        }
                        editor.insertHtml('</ul><br/>');
                    })
            }
        });

        editor.ui.addButton('tokenUserAutoFill', {
            label: 'Insert Token User Public Links',
            command: 'tuAutoFill',
            toolbar: 'insert',
            icon: this.path + 'icons/users.png'
        });
    }
});