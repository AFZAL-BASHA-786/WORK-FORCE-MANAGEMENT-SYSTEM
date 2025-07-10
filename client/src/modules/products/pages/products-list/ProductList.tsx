import React, { useState } from 'react';
import FinalNavbar from '../../../layout/pages/navbar/FinalNavBar';
import ProductSideBar from '../../component/ProductSideBar';
import cities from "../../../../assets/img/cities";
import { Col, Container, Form, Row } from 'react-bootstrap';
import { Cities } from '../../models/Cities';
import { AppDispatch, useAppDispatch } from '../../../../redux/store';
import { useNavigate } from 'react-router-dom';
// import * as citiesActions from '../../../../redux/cities/city.actions';
import { setSelectedCity } from '../../../../redux/cities/city.reducer'; // 
import { ToggleButtonGroup, ToggleButton } from 'react-bootstrap';
import { Table } from 'react-bootstrap';



const ProductList: React.FC = () =>{


    const dispatch : AppDispatch = useAppDispatch();
    const navigate = useNavigate();
    const [selectedValue, setSelectedValue] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');


    const filteredCities = cities.filter(city =>
      city.toLowerCase().includes(searchQuery.toLowerCase())
  );

    const handleRadioChange = (value: string) => {
        setSelectedValue(value);
      //   dispatch(citiesActions.getCity({value:value})).then((response:any)=>{
      //     if(response && !response.error){
      //         navigate("/products/fashion");
      //     }
      // })
      dispatch(setSelectedCity(value));
      navigate("/products/fashion");
        console.log(selectedValue);
        // You can display a pop-up window with a submit button here
    };

    const splitCities = (cities: string[]) => {
        const result: string[][] = [];
        for (let i = 0; i < cities.length; i += 5) {
          result.push(cities.slice(i, i + 5));
        }
        return result;
      }

    return (
        <>
            <FinalNavbar/>
            <Container>
            {/* <input
                    type="text"
                    placeholder="Search City"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                /> */}
                <Form.Group className='mt-3' controlId="searchCity">
                    <Form.Control
                        type="text"
                        placeholder="Search City"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="mb-3"
                    />
                </Form.Group>

                <Table striped bordered hover>
    <tbody>
        {splitCities(filteredCities).map((rowValues, rowIndex) => (
            <tr key={rowIndex}>
                {rowValues.map((city, colIndex) => (
                    <td key={colIndex}>
                        <input
                            type="radio"
                            id={`radio-${rowIndex}-${colIndex}`}
                            value={city}
                            checked={selectedValue === city}
                            onChange={() => handleRadioChange(city)}
                            style={{ marginRight: '5px' }}
                        />
                        <label htmlFor={`radio-${rowIndex}-${colIndex}`}>{city}</label>
                    </td>
                ))}
            </tr>
        ))}
    </tbody>
</Table>

                {/* {splitCities(filteredCities).map((rowValues, rowIndex) => (
    <Row key={rowIndex} className="mb-3">
        <ToggleButtonGroup type="radio" name="cityRadio" defaultValue={selectedValue}>
            {rowValues.map((city, colIndex) => (
                <ToggleButton
                    key={colIndex}
                    id={`radio-${rowIndex}-${colIndex}`}
                    value={city}
                    variant="secondary"
                    onChange={() => handleRadioChange(city)}
                    style={{ marginRight: '5px' }} // Add margin-right for spacing
                >
                    {city}
                </ToggleButton>
            ))}
        </ToggleButtonGroup>
    </Row>
))} */}

                {/* {splitCities(filteredCities).map((rowValues, rowIndex) => (
    <Row key={rowIndex} className="mb-3">
        {rowValues.map((city, colIndex) => (
            <Col key={colIndex}>
                <Form.Check
                    type="radio"
                    id={`radio-${rowIndex}-${colIndex}`}
                    label={city}
                    value={city}
                    checked={selectedValue === city}
                    onChange={() => handleRadioChange(city)}
                    className="mb-2"
                />
            </Col>
        ))}
    </Row>
))} */}
          
      {/* {splitCities(filteredCities).map((rowValues, rowIndex) => (
        <Row key={rowIndex} className="mb-3">
          {rowValues.map((city, colIndex) => (
            <Col key={colIndex}>
              <input
                type="radio"
                id={`radio-${rowIndex}-${colIndex}`}
                value={city}
                checked={selectedValue === city}
                onChange={() => handleRadioChange(city)}
              />
              <label htmlFor={`radio-${rowIndex}-${colIndex}`} className="ml-2">{city}</label>
            </Col>
          ))}
        </Row>
      ))} */}
      {/* Your pop-up window component */}
      {/* It should use selectedValue state for displaying the selected value */}
    </Container>
        </>
    )
}

export default ProductList;


// import React from 'react';
// import FinalNavbar from '../../../layout/pages/navbar/FinalNavBar';
// import ProductSideBar from '../../component/ProductSideBar';
// import cities from "../../../../assets/img/cities";
// import { Col, Container, Row } from 'react-bootstrap';
// import useSelectedValueRef from './selectedValueRef '; // Import the custom hook

// const ProductList: React.FC = () => {
//     const selectedValueRef = useSelectedValueRef(); // Use the custom hook to initialize selectedValueRef

//     const handleRadioChange = (value: string) => {
//         selectedValueRef.current = value;
//         console.log(selectedValueRef.current);
//         // You can display a pop-up window with a submit button here
//     };

//     const splitCities = (cities: string[]) => {
//         const result: string[][] = [];
//         for (let i = 0; i < cities.length; i += 5) {
//             result.push(cities.slice(i, i + 5));
//         }
//         return result;
//     };

//     return (
//         <>
//             <FinalNavbar />
//             <Container>
//                 {splitCities(cities).map((rowValues, rowIndex) => (
//                     <Row key={rowIndex} className="mb-3">
//                         {rowValues.map((city, colIndex) => (
//                             <Col key={colIndex}>
//                                 <input
//                                     type="radio"
//                                     id={`radio-${rowIndex}-${colIndex}`}
//                                     value={city}
//                                     checked={selectedValueRef.current === city}
//                                     onChange={() => handleRadioChange(city)}
//                                 />
//                                 <label htmlFor={`radio-${rowIndex}-${colIndex}`} className="ml-2">{city}</label>
//                             </Col>
//                         ))}
//                     </Row>
//                 ))}
//             </Container>
//         </>
//     );
// };

// export default ProductList;






