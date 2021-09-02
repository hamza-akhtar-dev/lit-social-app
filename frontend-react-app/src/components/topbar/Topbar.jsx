import "./topbar.css";
import { Chat, Notifications, Person, Search } from "@material-ui/icons";

export default function Topbar() {
    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <span className="logo">Lit Social</span>
            </div>
            <div className="topbarCenter">
                <div className="searchBar">
                    <Search className="searchIcon" />
                    <input type="text" placeholder="Search for friends, posts or videos"  className="searchInput" />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIcon">
                        <Person className="personIcon"/>
                        <span className="iconBadge">1</span>
                    </div>
                    <div className="topbarIcon">
                        <Chat className="chatIcon"/>
                        <span className="iconBadge">2</span>
                    </div>
                    <div className="topbarIcon">
                        <Notifications  className="notificationIcon"/>
                        <span className="iconBadge">3</span>
                    </div>
                </div>
                <img className="topbarImage" src="./assets/person/1.jpeg" alt="Profile" />
            </div>
        </div>
    )
}
