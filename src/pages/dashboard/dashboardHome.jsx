import React, { useEffect, useState } from 'react';
import { useAuth } from '../../Authentication/authContext';
import { db } from '../../Authentication/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ModalComponent from '../dashboard/small-comp/ModalComponent';
import './styles/dashboardHome.css';
import oneLakh from '../../assets/oneLakh.svg';
import twoLakh from '../../assets/twoLakh.svg';
import fiveLakh from '../../assets/fiveLakh.svg';
import tenLakh from '../../assets/tenLakh.svg';
import AddContact from './addContact/AddContact';
const DashboardHome = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPath, setSelectedPath] = useState('');
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userRef = doc(db, 'users', currentUser.uid);
          const userSnapshot = await getDoc(userRef);
          if (userSnapshot.exists()) {
            setUserData(userSnapshot.data());
          } else {
            console.log('User data not found');
          }
        } catch (error) {
          console.error('Error fetching user data:', error.message);
        }
      }
    };

    fetchUserData();
  }, [currentUser]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (path) => {
    setSelectedPath(path);
    setIsModalOpen(true);
  };

  const handleNewClick = () => {
    setIsModalOpen(false);
    navigate(`${selectedPath}`);
  };

  const handleExistingClick = () => {
    setIsModalOpen(false);
    navigate(`existingChits`);
  };

  return (
    <div className="dashboardHome w-full sm:flex p-2 items-end">
      <p className="title">MCR CHITS </p>
      <hr className="divider" />
      <div className="sm:flex-grow flex justify-between p-2">
        <div>
          <div className="image-grid">
            <img
              src={oneLakh}
              alt="Image 1"
              className="grid-item"
              onClick={() => handleImageClick('NewChitPage/1')}
            />
            <img
              src={twoLakh}
              alt="Image 2"
              className="grid-item"
              onClick={() => handleImageClick('NewChitPage/2')}
            />
            <img
              src={fiveLakh}
              alt="Image 3"
              className="grid-item"
              onClick={() => handleImageClick('NewChitPage/5')}
            />
            <img
              src={tenLakh}
              alt="Image 4"
              className="grid-item"
              onClick={() => handleImageClick('NewChitPage/10')}
            />
          </div>
        </div>
        {!isMobileView && (
          <>
            <br />
            <AddContact />
          </>
        )}
      </div>
      <ModalComponent
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        onNewClick={handleNewClick}
        onExistingClick={handleExistingClick}
      />
    </div>
  );
};

export default DashboardHome;
