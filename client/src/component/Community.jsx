import { useContext, useRef, useState, useEffect } from 'react'
import projectContext from '../context/projectContext';
import PropTypes from 'prop-types';
import CommunityCard from './CommunityCard';
import './css/Community.css'
import profileContext from '../context/profileContext';
import './EditProfile'
import avatar from '../assets/images/Dropdown/avatar.jpg';

const Community = (props) => {
  const [project, setproject] = useState({ id: "", etitle: "", edescription: "", egitHubLink: "", eyouTubeLink: "" });

  const [showVideo, setShowVideo] = useState(false);

  const handleVideo = () => {
    setShowVideo(true)
  }

  const handleVideoClose = () => {
    setShowVideo(false);
  };

  const context = useContext(projectContext)
  const { globalProjects, getGlobalProjects } = context;
  getGlobalProjects();

  const refDetails = useRef(null)

  const showDetailProject = (currentProject) => {
    refDetails.current.click();
    // Set the title, description and link to edit modal 
    setproject({ id: currentProject._id, etitle: currentProject.title, edescription: currentProject.description, egitHubLink: currentProject.gitHubLink, eyouTubeLink: currentProject.youTubeLink })
  }
    // edit  profile 
    const userProfileContext = useContext(profileContext);
    const { userProfile, getUserProfile } = userProfileContext;
    // Context for Profile
    // const [profiles, setprofiles] = useState({ id: "", name: "", college: "", phone: "", address: "" });
    // const [profiles, setprofiles] = useState([]);
    // const userProfileContext = useContext(profileContext);
    // const { getUserProfile } = userProfileContext;
    useEffect(() => {
        if (localStorage.getItem('token')) {
            getUserProfile();
        }
        else {
            navigate('/login')
        }
        // eslint-disable-next-line
    }, [])








  return (
    <>
      <div className="user-profile-dashboard">
        <div className="user-details">
          <div className="globalproject-left">
            <div className="globaldetail-left">
              <div className="profile-picture">
                <img src={avatar} alt="Profile" />
              </div>
              <div className="global-bio">
                <p>Name: <span>{userProfile.name}</span></p>
                <p>UserName : <span>Harshit7492</span></p>
              </div>
              <button>
                public
              </button>
              <hr />
              <div className="global-links">
                <h3>Discover</h3>
                <p>Popular</p>
                <p>Most Viewed</p>
                <p>Top rated</p>
              </div>
              <hr />
              <div className="global-skills">
                <h3>Contri</h3>
                <p>Discussion</p>

              </div>
              <hr />
              <div className="global-experience">
                <h3>Manage</h3>
                <p>Saved</p>
              </div>

              <div className="global-share">
                <h3>Share</h3>
                <p>Invite friends</p>
              </div>
            </div>
          </div>
          <div className="globalproject-right">
            <div className="globaldetail-right">
              <h2 className='Heading-Page'>Welcome to Bitbox Community</h2>
              <div>
                {/* Detail Button trigger modal */}
                <button ref={refDetails} className="btn" data-bs-toggle="modal" data-bs-target="#detailToggle">
                </button>

                {/* Project Details Modal */}
                <div className="modal fade" id="detailToggle" tabIndex="-1" aria-labelledby="detailToggle" aria-hidden="true">
                  <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalToggleLabel">Project Details</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        {project.edescription ? (<p>{project.edescription}</p>) : (<p>No description to display</p>)}
                      </div>
                      <div className="modal-footer">
                        <button href={project.egitHubLink} target="_blank" className="card-link btn btn-warning">Github Link</button>
                        <button className="btn btn-danger" onClick={handleVideo}>Youtube Link</button>
                        <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#detailToggle">Close</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='container Global-Sec-Container'>
                  <div className='row'>
                    {globalProjects.map((project) => {
                      return <CommunityCard showAlert={props.showAlert} showDetailProject={showDetailProject} key={project._id} project={project} />;
                    })}
                  </div>
                </div>
                {/* youTube video Modal */}
                {showVideo && (
                  <div className="video-overlays container">
                    <div className="Video-Modal container">
                      <div className="Video-card ">
                        <div className="Video-content">
                          <button className="exit2-button" onClick={handleVideoClose}>
                            <svg height="20px" viewBox="0 0 384 512">
                              <path
                                d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                              ></path>
                            </svg>
                          </button>
                          <p className="video-heading fs-1">Project Video</p>
                          <p>
                            <iframe className='youtube-Frame' width="350" height="315" src={project.eyouTubeLink} frameBorder="0" allowfullscreen></iframe>
                          </p>
                        </div>
                        <div className="card-button-wrapper">
                          <button className="card-button secondary" onClick={handleVideoClose}>Cancel</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Props Vadilation
Community.propTypes = {
  project: PropTypes.string,
  showAlert: PropTypes.func,
};

export default Community