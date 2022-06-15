import React, { useState, useMemo, useEffect } from "react";
import Table from 'rc-table';
import debouce from "lodash.debounce";
import Styles from "./List.module.css";
import InputStyles from '../../components/Input.module.css';
import Pagination from "../../components/Pagination";

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail',
    key: 'thumbnail',
    render: () => {
      return <img alt="movie poster" src={'https://image.tmdb.org/t/p/w500/xBHvZcjRiWyobQ9kxBhO6B2dtRI.jpg'} width='60px' height='60px' />
    }
  },
  {
    title: 'Delete',
    dataIndex: '',
    key: 'delete',
    render: () => <button>Delete</button>,
  },
];

const data = [
  { idx: "AD", title: "Andorra", thumbnail: "376" },
  { idx: "AE", title: "United Arab Emirates", thumbnail: "971" },
  { idx: "AF", title: "Afghanistan", thumbnail: "93" },
  { idx: "AG", title: "Antigua and Barbuda", thumbnail: "1-268" },
  { idx: "AI", title: "Anguilla", thumbnail: "1-264" },
  { idx: "AL", title: "Albania", thumbnail: "355" },
  { idx: "AM", title: "Armenia", thumbnail: "374" },
  { idx: "AO", title: "Angola", thumbnail: "244" },
  { idx: "AQ", title: "Antarctica", thumbnail: "672" },
  { idx: "AR", title: "Argentina", thumbnail: "54" },
  { idx: "AS", title: "American Samoa", thumbnail: "1-684" },
  { idx: "AT", title: "Austria", thumbnail: "43" },
  { idx: "AU", title: "Australia", thumbnail: "61", suggested: true },
  { idx: "AW", title: "Aruba", thumbnail: "297" },
  { idx: "AX", title: "Alland Islands", thumbnail: "358" },
  { idx: "AZ", title: "Azerbaijan", thumbnail: "994" },
  { idx: "BA", title: "Bosnia and Herzegovina", thumbnail: "387" },
  { idx: "BB", title: "Barbados", thumbnail: "1-246" },
  { idx: "BD", title: "Bangladesh", thumbnail: "880" },
  { idx: "BE", title: "Belgium", thumbnail: "32" },
  { idx: "BF", title: "Burkina Faso", thumbnail: "226" },
  { idx: "BG", title: "Bulgaria", thumbnail: "359" },
  { idx: "BH", title: "Bahrain", thumbnail: "973" },
  { idx: "BI", title: "Burundi", thumbnail: "257" },
  { idx: "BJ", title: "Benin", thumbnail: "229" },
  { idx: "BL", title: "Saint Barthelemy", thumbnail: "590" },
  { idx: "BM", title: "Bermuda", thumbnail: "1-441" },
  { idx: "BN", title: "Brunei Darussalam", thumbnail: "673" },
  { idx: "BO", title: "Bolivia", thumbnail: "591" },
  { idx: "BR", title: "Brazil", thumbnail: "55" },
  { idx: "BS", title: "Bahamas", thumbnail: "1-242" },
  { idx: "BT", title: "Bhutan", thumbnail: "975" },
  { idx: "BV", title: "Bouvet Island", thumbnail: "47" },
  { idx: "BW", title: "Botswana", thumbnail: "267" },
  { idx: "BY", title: "Belarus", thumbnail: "375" },
  { idx: "BZ", title: "Belize", thumbnail: "501" },
  { idx: "CA", title: "Canada", thumbnail: "1", suggested: true },
  { idx: "CC", title: "Cocos (Keeling) Islands", thumbnail: "61" },
  { idx: "CD", title: "Congo, Democratic Republic of the", thumbnail: "243" },
  { idx: "CF", title: "Central African Republic", thumbnail: "236" },
  { idx: "CG", title: "Congo, Republic of the", thumbnail: "242" },
  { idx: "CH", title: "Switzerland", thumbnail: "41" },
  { idx: "CI", title: "Cote d'Ivoire", thumbnail: "225" },
  { idx: "CK", title: "Cook Islands", thumbnail: "682" },
  { idx: "CL", title: "Chile", thumbnail: "56" },
  { idx: "CM", title: "Cameroon", thumbnail: "237" },
  { idx: "CN", title: "China", thumbnail: "86" },
  { idx: "CO", title: "Colombia", thumbnail: "57" },
  { idx: "CR", title: "Costa Rica", thumbnail: "506" },
  { idx: "CU", title: "Cuba", thumbnail: "53" },
  { idx: "CV", title: "Cape Verde", thumbnail: "238" },
  { idx: "CW", title: "Curacao", thumbnail: "599" },
  { idx: "CX", title: "Christmas Island", thumbnail: "61" },
  { idx: "CY", title: "Cyprus", thumbnail: "357" },
  { idx: "CZ", title: "Czech Republic", thumbnail: "420" },
  { idx: "DE", title: "Germany", thumbnail: "49", suggested: true },
  { idx: "DJ", title: "Djibouti", thumbnail: "253" },
  { idx: "DK", title: "Denmark", thumbnail: "45" },
  { idx: "DM", title: "Dominica", thumbnail: "1-767" },
  { idx: "DO", title: "Dominican Republic", thumbnail: "1-809" },
  { idx: "DZ", title: "Algeria", thumbnail: "213" },
  { idx: "EC", title: "Ecuador", thumbnail: "593" },
  { idx: "EE", title: "Estonia", thumbnail: "372" },
  { idx: "EG", title: "Egypt", thumbnail: "20" },
  { idx: "EH", title: "Western Sahara", thumbnail: "212" },
  { idx: "ER", title: "Eritrea", thumbnail: "291" },
  { idx: "ES", title: "Spain", thumbnail: "34" },
  { idx: "ET", title: "Ethiopia", thumbnail: "251" },
  { idx: "FI", title: "Finland", thumbnail: "358" },
  { idx: "FJ", title: "Fiji", thumbnail: "679" },
  { idx: "FK", title: "Falkland Islands (Malvinas)", thumbnail: "500" },
  { idx: "FM", title: "Micronesia, Federated States of", thumbnail: "691" },
  { idx: "FO", title: "Faroe Islands", thumbnail: "298" },
  { idx: "FR", title: "France", thumbnail: "33", suggested: true },
  { idx: "GA", title: "Gabon", thumbnail: "241" },
  { idx: "GB", title: "United Kingdom", thumbnail: "44" },
  { idx: "GD", title: "Grenada", thumbnail: "1-473" },
  { idx: "GE", title: "Georgia", thumbnail: "995" },
  { idx: "GF", title: "French Guiana", thumbnail: "594" },
  { idx: "GG", title: "Guernsey", thumbnail: "44" },
  { idx: "GH", title: "Ghana", thumbnail: "233" },
  { idx: "GI", title: "Gibraltar", thumbnail: "350" },
  { idx: "GL", title: "Greenland", thumbnail: "299" },
  { idx: "GM", title: "Gambia", thumbnail: "220" },
  { idx: "GN", title: "Guinea", thumbnail: "224" },
  { idx: "GP", title: "Guadeloupe", thumbnail: "590" },
  { idx: "GQ", title: "Equatorial Guinea", thumbnail: "240" },
  { idx: "GR", title: "Greece", thumbnail: "30" },
  {
    idx: "GS",
    title: "South Georgia and the South Sandwich Islands",
    thumbnail: "500"
  },
  { idx: "GT", title: "Guatemala", thumbnail: "502" },
  { idx: "GU", title: "Guam", thumbnail: "1-671" },
  { idx: "GW", title: "Guinea-Bissau", thumbnail: "245" },
  { idx: "GY", title: "Guyana", thumbnail: "592" },
  { idx: "HK", title: "Hong Kong", thumbnail: "852" },
  { idx: "HM", title: "Heard Island and McDonald Islands", thumbnail: "672" },
  { idx: "HN", title: "Honduras", thumbnail: "504" },
  { idx: "HR", title: "Croatia", thumbnail: "385" },
  { idx: "HT", title: "Haiti", thumbnail: "509" },
  { idx: "HU", title: "Hungary", thumbnail: "36" },
  { idx: "ID", title: "Indonesia", thumbnail: "62" },
  { idx: "IE", title: "Ireland", thumbnail: "353" },
  { idx: "IL", title: "Israel", thumbnail: "972" },
  { idx: "IM", title: "Isle of Man", thumbnail: "44" },
  { idx: "IN", title: "India", thumbnail: "91" },
  { idx: "IO", title: "British Indian Ocean Territory", thumbnail: "246" },
  { idx: "IQ", title: "Iraq", thumbnail: "964" },
  { idx: "IR", title: "Iran, Islamic Republic of", thumbnail: "98" },
  { idx: "IS", title: "Iceland", thumbnail: "354" },
  { idx: "IT", title: "Italy", thumbnail: "39" },
  { idx: "JE", title: "Jersey", thumbnail: "44" },
  { idx: "JM", title: "Jamaica", thumbnail: "1-876" },
  { idx: "JO", title: "Jordan", thumbnail: "962" },
  { idx: "JP", title: "Japan", thumbnail: "81", suggested: true },
  { idx: "KE", title: "Kenya", thumbnail: "254" },
  { idx: "KG", title: "Kyrgyzstan", thumbnail: "996" },
  { idx: "KH", title: "Cambodia", thumbnail: "855" },
  { idx: "KI", title: "Kiribati", thumbnail: "686" },
  { idx: "KM", title: "Comoros", thumbnail: "269" },
  { idx: "KN", title: "Saint Kitts and Nevis", thumbnail: "1-869" },
  { idx: "KP", title: "Korea, Democratic People's Republic of", thumbnail: "850" },
  { idx: "KR", title: "Korea, Republic of", thumbnail: "82" },
  { idx: "KW", title: "Kuwait", thumbnail: "965" },
  { idx: "KY", title: "Cayman Islands", thumbnail: "1-345" },
  { idx: "KZ", title: "Kazakhstan", thumbnail: "7" },
  { idx: "LA", title: "Lao People's Democratic Republic", thumbnail: "856" },
  { idx: "LB", title: "Lebanon", thumbnail: "961" },
  { idx: "LC", title: "Saint Lucia", thumbnail: "1-758" },
  { idx: "LI", title: "Liechtenstein", thumbnail: "423" },
  { idx: "LK", title: "Sri Lanka", thumbnail: "94" },
  { idx: "LR", title: "Liberia", thumbnail: "231" },
  { idx: "LS", title: "Lesotho", thumbnail: "266" },
  { idx: "LT", title: "Lithuania", thumbnail: "370" },
  { idx: "LU", title: "Luxembourg", thumbnail: "352" },
  { idx: "LV", title: "Latvia", thumbnail: "371" },
  { idx: "LY", title: "Libya", thumbnail: "218" },
  { idx: "MA", title: "Morocco", thumbnail: "212" },
  { idx: "MC", title: "Monaco", thumbnail: "377" },
  { idx: "MD", title: "Moldova, Republic of", thumbnail: "373" },
  { idx: "ME", title: "Montenegro", thumbnail: "382" },
  { idx: "MF", title: "Saint Martin (French part)", thumbnail: "590" },
  { idx: "MG", title: "Madagascar", thumbnail: "261" },
  { idx: "MH", title: "Marshall Islands", thumbnail: "692" },
  {
    idx: "MK",
    title: "Macedonia, the Former Yugoslav Republic of",
    thumbnail: "389"
  },
  { idx: "ML", title: "Mali", thumbnail: "223" },
  { idx: "MM", title: "Myanmar", thumbnail: "95" },
  { idx: "MN", title: "Mongolia", thumbnail: "976" },
  { idx: "MO", title: "Macao", thumbnail: "853" },
  { idx: "MP", title: "Northern Mariana Islands", thumbnail: "1-670" },
  { idx: "MQ", title: "Martinique", thumbnail: "596" },
  { idx: "MR", title: "Mauritania", thumbnail: "222" },
  { idx: "MS", title: "Montserrat", thumbnail: "1-664" },
  { idx: "MT", title: "Malta", thumbnail: "356" },
  { idx: "MU", title: "Mauritius", thumbnail: "230" },
  { idx: "MV", title: "Maldives", thumbnail: "960" },
  { idx: "MW", title: "Malawi", thumbnail: "265" },
  { idx: "MX", title: "Mexico", thumbnail: "52" },
  { idx: "MY", title: "Malaysia", thumbnail: "60" },
  { idx: "MZ", title: "Mozambique", thumbnail: "258" },
  { idx: "NA", title: "Namibia", thumbnail: "264" },
  { idx: "NC", title: "New Caledonia", thumbnail: "687" },
  { idx: "NE", title: "Niger", thumbnail: "227" },
  { idx: "NF", title: "Norfolk Island", thumbnail: "672" },
  { idx: "NG", title: "Nigeria", thumbnail: "234" },
  { idx: "NI", title: "Nicaragua", thumbnail: "505" },
  { idx: "NL", title: "Netherlands", thumbnail: "31" },
  { idx: "NO", title: "Norway", thumbnail: "47" },
  { idx: "NP", title: "Nepal", thumbnail: "977" },
  { idx: "NR", title: "Nauru", thumbnail: "674" },
  { idx: "NU", title: "Niue", thumbnail: "683" },
  { idx: "NZ", title: "New Zealand", thumbnail: "64" },
  { idx: "OM", title: "Oman", thumbnail: "968" },
  { idx: "PA", title: "Panama", thumbnail: "507" },
  { idx: "PE", title: "Peru", thumbnail: "51" },
  { idx: "PF", title: "French Polynesia", thumbnail: "689" },
  { idx: "PG", title: "Papua New Guinea", thumbnail: "675" },
  { idx: "PH", title: "Philippines", thumbnail: "63" },
  { idx: "PK", title: "Pakistan", thumbnail: "92" },
  { idx: "PL", title: "Poland", thumbnail: "48" },
  { idx: "PM", title: "Saint Pierre and Miquelon", thumbnail: "508" },
  { idx: "PN", title: "Pitcairn", thumbnail: "870" },
  { idx: "PR", title: "Puerto Rico", thumbnail: "1" },
  { idx: "PS", title: "Palestine, State of", thumbnail: "970" },
  { idx: "PT", title: "Portugal", thumbnail: "351" },
  { idx: "PW", title: "Palau", thumbnail: "680" },
  { idx: "PY", title: "Paraguay", thumbnail: "595" },
  { idx: "QA", title: "Qatar", thumbnail: "974" },
  { idx: "RE", title: "Reunion", thumbnail: "262" },
  { idx: "RO", title: "Romania", thumbnail: "40" },
  { idx: "RS", title: "Serbia", thumbnail: "381" },
  { idx: "RU", title: "Russian Federation", thumbnail: "7" },
  { idx: "RW", title: "Rwanda", thumbnail: "250" },
  { idx: "SA", title: "Saudi Arabia", thumbnail: "966" },
  { idx: "SB", title: "Solomon Islands", thumbnail: "677" },
  { idx: "SC", title: "Seychelles", thumbnail: "248" },
  { idx: "SD", title: "Sudan", thumbnail: "249" },
  { idx: "SE", title: "Sweden", thumbnail: "46" },
  { idx: "SG", title: "Singapore", thumbnail: "65" },
  { idx: "SH", title: "Saint Helena", thumbnail: "290" },
  { idx: "SI", title: "Slovenia", thumbnail: "386" },
  { idx: "SJ", title: "Svalbard and Jan Mayen", thumbnail: "47" },
  { idx: "SK", title: "Slovakia", thumbnail: "421" },
  { idx: "SL", title: "Sierra Leone", thumbnail: "232" },
  { idx: "SM", title: "San Marino", thumbnail: "378" },
  { idx: "SN", title: "Senegal", thumbnail: "221" },
  { idx: "SO", title: "Somalia", thumbnail: "252" },
  { idx: "SR", title: "Suriname", thumbnail: "597" },
  { idx: "SS", title: "South Sudan", thumbnail: "211" },
  { idx: "ST", title: "Sao Tome and Principe", thumbnail: "239" },
  { idx: "SV", title: "El Salvador", thumbnail: "503" },
  { idx: "SX", title: "Sint Maarten (Dutch part)", thumbnail: "1-721" },
  { idx: "SY", title: "Syrian Arab Republic", thumbnail: "963" },
  { idx: "SZ", title: "Swaziland", thumbnail: "268" },
  { idx: "TC", title: "Turks and Caicos Islands", thumbnail: "1-649" },
  { idx: "TD", title: "Chad", thumbnail: "235" },
  { idx: "TF", title: "French Southern Territories", thumbnail: "262" },
  { idx: "TG", title: "Togo", thumbnail: "228" },
  { idx: "TH", title: "Thailand", thumbnail: "66" },
  { idx: "TJ", title: "Tajikistan", thumbnail: "992" },
  { idx: "TK", title: "Tokelau", thumbnail: "690" },
  { idx: "TL", title: "Timor-Leste", thumbnail: "670" },
  { idx: "TM", title: "Turkmenistan", thumbnail: "993" },
  { idx: "TN", title: "Tunisia", thumbnail: "216" },
  { idx: "TO", title: "Tonga", thumbnail: "676" },
  { idx: "TR", title: "Turkey", thumbnail: "90" },
  { idx: "TT", title: "Trinidad and Tobago", thumbnail: "1-868" },
  { idx: "TV", title: "Tuvalu", thumbnail: "688" },
  { idx: "TW", title: "Taiwan, Province of China", thumbnail: "886" },
  { idx: "TZ", title: "United Republic of Tanzania", thumbnail: "255" },
  { idx: "UA", title: "Ukraine", thumbnail: "380" },
  { idx: "UG", title: "Uganda", thumbnail: "256" },
  { idx: "US", title: "United States", thumbnail: "1", suggested: true },
  { idx: "UY", title: "Uruguay", thumbnail: "598" },
  { idx: "UZ", title: "Uzbekistan", thumbnail: "998" },
  { idx: "VA", title: "Holy See (Vatican City State)", thumbnail: "379" },
  { idx: "VC", title: "Saint Vincent and the Grenadines", thumbnail: "1-784" },
  { idx: "VE", title: "Venezuela", thumbnail: "58" },
  { idx: "VG", title: "British Virgin Islands", thumbnail: "1-284" },
  { idx: "VI", title: "US Virgin Islands", thumbnail: "1-340" },
  { idx: "VN", title: "Vietnam", thumbnail: "84" },
  { idx: "VU", title: "Vanuatu", thumbnail: "678" },
  { idx: "WF", title: "Wallis and Futuna", thumbnail: "681" },
  { idx: "WS", title: "Samoa", thumbnail: "685" },
  { idx: "XK", title: "Kosovo", thumbnail: "383" },
  { idx: "YE", title: "Yemen", thumbnail: "967" },
  { idx: "YT", title: "Mayotte", thumbnail: "262" },
  { idx: "ZA", title: "South Africa", thumbnail: "27" },
  { idx: "ZM", title: "Zambia", thumbnail: "260" },
  { idx: "ZW", title: "Zimbabwe", thumbnail: "263" }
]

const List: React.FC<{}> = () => {

  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(e.target.value)
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });


  return (
    <div className={Styles.MovieListWrap}>
      <div className={Styles.MovieListContainer}>
      <div className={Styles.TitleContainer}>
        <h1>Movie List</h1>
          <p>Here are all your favourite movie</p>
        </div>
        <div className={InputStyles.inputRow}>
          <input name="search" onChange={debouncedResults} placeholder="Search movie..." />
        </div>
        <Table
          className={Styles.Table}
          columns={columns}
          data={false ? [] : data.slice(0, 10)}
          rowClassName={(row, key) => `${key % 2 ? Styles.rowEven : Styles.rowOdd}`}
          emptyText={() => <div>No data available!</div>}
          rowKey={obj => obj.idx}
        />
        <Pagination 
          listPerPage={10}
          totalData={data.length}
          paginateData={(page) => {console.log(page)}}
          className={Styles.Pagination}
        />
      </div>
    </div>
  );
};

export default List;