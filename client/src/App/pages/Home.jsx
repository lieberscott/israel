import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';

import CategoryHomepage from "./private/CategoryHomepage.jsx";



const Home = () => {

  const imagesArr = [
    { xs: 8, category: "hostages", name: "Hostage Stories", subcategories: ["hostageStories"] },
    { xs: 4, category: "oct7", name: "Oct. 7 testimonies", subcategories: ["oct7fallen", "oct7testimonies", "heroicStories"]},
    { xs: 4, category: "fallen_soldiers", name: "Fallen soldiers", subcategories: ["israeliFallenSoldiersStories"]},
    { xs: 8, category: "hamas_evil", name: "Hamas Evil", subcategories: ["gazaSickCultureOfHate", "gazaTeachesKidsHateAndViolence", "hamasInTheirOwnWordsAndHamasEvil", "hamasWarCrimes", "houthis", "noGazanIsInnocent", "noPalestinianState", "palestiniansOnlyHaveThemselvesToBlame", "hamasLies", "hideFacesLikeKlan", "proPalestineSupportsViolenceAndHamas", "proPalestineViolenceIntimidation", "stupidProtestors", "tearingDownPosters", "antiSemitism", "dayAfterProtests", "theNewNazis", "theyreFullOfHate", "harvestingOrgansLibel", "oneStateSolutionGame"] },
    // { xs: 7, category: "pro_palestine_lies", subcategories: ["antiIsraelTwitterLies", "itsNotAboutIsraeliMistreatment", "palestineWasARealPlaceLie", "palestiniansWelcomedJewsLie", "proPalestineLies", "apartheid", "colonizersLie", "counteringAntiIsraelCliches", "ethnicCleansingInversion", "genocideCliche", "israelInversionStrategy", "antiIsraelJewsCounterarguments", "alAlhiHospitalBombing", "alShifaHospital", "blamingIsraelLies", "deathTollLie", "gazanDoctorsAndJournalists", "internationalLaw"]},
    // { xs: 5, category: "moving_pro_israel_speeches", subcategories: ["movingProIsraelSpeeches"]}
  
  ]

  const handleClick = async () => {
    const response = await fetch(`/add_to_mongo`);
    const json = await response.json();

    console.log("json : ", json);
  }


  return (
    <div className="homePageWrapper">
      <div className="textWhite">This site is meant to provide an easy place for people to learn about the current conflict.</div>
      <button onClick={ handleClick}>Add to Mongo</button>
      <div className="gridWrapper">
      <Grid container spacing={2}>
        
        { imagesArr.map((item, i) => {
          return (
              <Grid key={item.category} position="relative" borderRadius={6} height={250} xs={item.xs} md={item.xs}>
                <Link key={item.category} href={`/category/${item.category}`}>
                  <CategoryHomepage category={ item.category } name={ item.name } />
                </Link>
              </Grid>
          )
        })}
        
      </Grid>
    </div>
    </div>
  );
}
export default Home;