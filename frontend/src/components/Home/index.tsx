import React, { useState, useEffect } from "react";
import AuthService from "services/services";

const Home = () => {
  const [content, setContent] = useState<any>("Movies");

    return (
        <div>
            {content}
        </div>
    )
}

export default Home;