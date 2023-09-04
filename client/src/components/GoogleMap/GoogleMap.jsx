import React from 'react'


const GoogleMap = ({ className }) => {
    return (
        <>

            <div class="mapouter">
                <div class="gmap_canvas">
                <iframe 
                className={`rounded-xl h-44 ${className}`}
                id="gmap_canvas" src="https://maps.google.com/maps?q=Muscat&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                </iframe>
            </div>
            </div>

            {/* <div className="rounded-sm">
                <iframe
                    className={`rounded-xl md:ml-12 md:ml-0 h-44 ${className}`}
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?width=520&amp;height=386&amp;hl=en&amp;q=pimplegaon%20pune+(pimpalgaon)&amp;t=k&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                ></iframe>{" "}
                <a href="https://add-map.com/"></a>{" "}
                <script
                    type="text/javascript"
                    src="https://embedmaps.com/google-maps-authorization/script.js?id=0be1ddff42e0997de165b8ff4033d38efb3890f2"
                ></script>
            </div> */}
        </>
    )
}

export default GoogleMap