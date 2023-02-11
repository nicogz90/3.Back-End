const Team = require("../models/Team");

module.exports = async () => {
  const teams = [
    { code: "ar", name: "Argentina", flag: "🇦🇷" },
    { code: "au", name: "Australia", flag: "🇦🇺" },
    { code: "be", name: "Belgium", flag: "🇧🇪" },
    { code: "br", name: "Brazil", flag: "🇧🇷" },
    { code: "ch", name: "Switzerland", flag: "🇨🇭" },
    { code: "co", name: "Colombia", flag: "🇨🇴" },
    { code: "cr", name: "Costa Rica", flag: "🇨🇷" },
    { code: "de", name: "Germany", flag: "🇩🇪" },
    { code: "dk", name: "Denmark", flag: "🇩🇰" },
    { code: "eg", name: "Egypt", flag: "🇪🇬" },
    { code: "es", name: "Spain", flag: "🇪🇸" },
    { code: "fr", name: "France", flag: "🇫🇷" },
    { code: "hr", name: "Croatia", flag: "🇭🇷" },
    { code: "ir", name: "Iran", flag: "🇮🇷" },
    { code: "is", name: "Iceland", flag: "🇮🇸" },
    { code: "jp", name: "Japan", flag: "🇯🇵" },
    { code: "kr", name: "Korea Republic", flag: "🇰🇷" },
    { code: "ma", name: "Morocco", flag: "🇲🇦" },
    { code: "mx", name: "Mexico", flag: "🇲🇽" },
    { code: "nd", name: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿" },
    { code: "ng", name: "Nigeria", flag: "🇳🇬" },
    { code: "pa", name: "Panama", flag: "🇵🇦" },
    { code: "pe", name: "Peru", flag: "🇵🇪" },
    { code: "pl", name: "Poland", flag: "🇵🇱" },
    { code: "pt", name: "Portugal", flag: "🇵🇹" },
    { code: "rs", name: "Serbia", flag: "🇷🇸" },
    { code: "ru", name: "Russia", flag: "🇷🇺" },
    { code: "sa", name: "Saudi Arabia", flag: "🇸🇦" },
    { code: "se", name: "Sweden", flag: "🇸🇪" },
    { code: "sn", name: "Senegal", flag: "🇸🇳" },
    { code: "tn", name: "Tunisia", flag: "🇹🇳" },
    { code: "uy", name: "Uruguay", flag: "🇺🇾" },
  ];

  /* for (const team of teams) {
    const dbTeam = new Team({
      code: team.code,
      name: team.name,
      flag: team.flag,
    });
    dbTeam
      .save()
      .then((team) => {
        // console.log("Se ha creado el equipo", team)
      })
      .catch((err) => {
        // console.log("Error al crear el equipo", err)
      });
  } */

  await Team.syncIndexes(); // Explicación: http://thecodebarbarian.com/whats-new-in-mongoose-5-2-syncindexes
  await Team.insertMany(teams);

  console.log(`Se guardaron ${teams.length} equipos en la base de datos`);
};
