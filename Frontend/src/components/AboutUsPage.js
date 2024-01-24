// AboutUsPage.js
import React from 'react';

const MemberDetails = ({ name, id }) => (
  <div>
    <h3>{name}</h3>
    <p>ID: {id}</p>
  </div>
);

const AboutUsPage = () => {
  const members = [
    { name: 'Amitesh Singh', id: '12310520' },
    { name: 'Bhakti Dhorajiya', id: '12310590' },
    { name: 'Chayan Pathak', id: '12310630' },
    { name: 'Jaickey Joy Minj', id: '12310700' },
  ];

  return (
    <div>
      <h1>About Us - Stars Aligned</h1>
      <p>
        Stars Aligned is a dynamic group of individuals committed to creating innovative solutions and
        making a positive impact in the world.
      </p>
      <h2>Our Members</h2>
      {members.map((member) => (
        <MemberDetails key={member.id} name={member.name} id={member.id} />
      ))}
    </div>
  );
};

export default AboutUsPage;
