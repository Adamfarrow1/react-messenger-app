import { useState } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Chat from "./Chat";
const Content = () => {


    return ( 
       <>
         <Header></Header>
        <div className="container-xxl">
           
            <div className="content">
                <div className="row">
                    <Sidebar></Sidebar>
                    <div className="col-9 messages text-center d-flex flex-column">
                        <Chat></Chat>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}
 
export default Content;