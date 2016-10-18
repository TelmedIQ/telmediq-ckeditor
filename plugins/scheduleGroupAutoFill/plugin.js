CKEDITOR.plugins.add('scheduleGroupAutoFill', {
    icons: 'calendar',
    init: function (editor) {
        editor.addCommand('sgAutoFill', {
            exec: function(editor){

                function buildLink(schedule){
                    return String.format('<li><a href="/paginggroups/public/{0}/">{1}</a></li>', schedule.uid, schedule.name);
                }


                var url = '/api/v1/publicSchedules/?page_size=100';
                var schedules = [];
                $.get(url)
                    .done(function(data){
                        var results = data.results;
                        var html = '<ul>';
                        _.forEach(results, function(schedule){
                            schedules.push({name: schedule.name, uid: schedule.uid});
                        });

                        for(var i = 0; i < schedules.length; i++){
                            html += buildLink(schedules[i]);
                        }

                        html += '</ul><br/>';

                        editor.insertHtml(html)
                    })
                    .fail(function(){
                        alert("An unexpected error occurred autofilling schedule groups");
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