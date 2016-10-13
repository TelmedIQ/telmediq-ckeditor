CKEDITOR.plugins.add('scheduleGroupAutoFill', {
    icons: 'calendar',
    init: function (editor) {
        editor.addCommand('sgAutoFill', {
            exec: function(editor){

                function buildLink(schedule){
                    return String.format('<li><a href="/paginggroups/public/{0}/">{1}</a></li>', schedule.uid, schedule.name);
                }


                var url = '/api/v1/publicSchedules/';
                var schedules = [];
                $.get(url)
                    .done(function(data){
                        var results = data.results;
                        _.forEach(results, function(schedule){
                            schedules.push({name: schedule.name, uid: schedule.uid});
                        });
                    })
                    .always(function(){
                        editor.insertHtml('<ul>');
                        for(var i = 0; i < schedules.length; i++){
                            editor.insertHtml(buildLink(schedules[i]));
                        }
                        editor.insertHtml('</ul><br/>');
                    });
            }
        });

        editor.ui.addButton('scheduleGroupAutoFill', {
            label: 'Insert Schedule Group Public Links',
            command: 'sgAutoFill',
            toolbar: 'insert',
            icon: this.path + 'icons/calendar.png'
        });
    }
});