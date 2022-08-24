
const IFrameSrc = `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <title>Acos-Client Simulator</title>
        <meta name="description" content="ACOS Client Simulator" />
        <meta name="author" content="A Cup of Skill" />
        <meta
            http-equiv="Content-Security-Policy"
            content="default-src https://fonts.gstatic.com https://fonts.googleapis.com https://cdn.acos.games 'unsafe-inline' 'self' data:"
        />
    </head>
    <body>
        <div id="root"></div>
        <script>
            const urlprefix = 'cdn.acos.games/file/acospub/g/';;
            const onMessage = (evt) => {
                let m = evt.data;
                let origin = evt.origin;
                let source = evt.source;
                if (!m || m.length == 0)
                    return;
                if( m.type == 'load' ) { 
                    de();
                    let url = 'https://'+urlprefix+m.payload.game_slug+'/client/client.bundle.'+m.payload.version+'.js';
                    console.log(">>> Loading Client Bundle: ", url);
                    loadJS(url);
                }
            }
            function de() {
                window.removeEventListener('message', onMessage, false);
            }
            function at() {
                window.addEventListener('message', onMessage, false);
            }
            function loadJS(url) {
                loadScript(url, function(path, status) {
                    if( status == 'ok')
                        setTimeout(()=>{
                            window.parent.postMessage({ type:'loaded' }, '*');
                        },1)
                });
            }
            at();
            function loadScript(path, callback) {
                var done = false;
                var scr = document.createElement('script');
                scr.onload = handleLoad;
                scr.onreadystatechange = handleReadyStateChange;
                scr.onerror = handleError;
                scr.src = path;
                document.body.appendChild(scr);
                function handleLoad() {
                    if (!done) {
                        done = true;
                        callback(path, "ok");
                    }
                }
                function handleReadyStateChange() {
                    var state;
                    if (!done) {
                        state = scr.readyState;
                        if (state === "complete") {
                            handleLoad();
                        }
                    }
                }
                function handleError() {
                    if (!done) {
                        done = true;
                        callback(path, "error");
                    }
                }
            }
        </script>
    </body>
</html>`;

export default IFrameSrc;