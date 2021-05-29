import React from 'react'
import {
   Form,
   InputGroup,
   Button,
   Card,
   ListGroup,
   Spinner,
} from 'react-bootstrap'

const searchBarStyle = {
   width: '380px',
   position: 'absolute',
   top: '10px',
   left: '10px',
   backgroundColor: 'white',
}

const MapSearchBar = ({
   query,
   setQuery,
   places,
   handleSelectPlace,
   handleSearch,
   placesLoading,
}) => {
   return (
      <div style={searchBarStyle}>
         <Form onSubmit={handleSearch}>
            <InputGroup>
               <Form.Control
                  type='textfield'
                  placeholder='Busca lugares'
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
               ></Form.Control>
               <InputGroup.Append>
                  <Button type='submit'>
                     {placesLoading ? (
                        <Spinner animation='border' variant='dark' size='sm' />
                     ) : (
                        'Search'
                     )}
                  </Button>
               </InputGroup.Append>
            </InputGroup>
         </Form>
         <Card style={{ maxHeight: '60vh', overflowY: 'scroll' }}>
            <ListGroup>
               {places?.map((result, i) => (
                  <ListGroup.Item
                     action
                     key={i}
                     className='p-2'
                     onClick={() => handleSelectPlace(result.geometry.location)}
                  >
                     <p className='text-primary m-0'>{result.name}</p>
                     <p className='text-muted m-0'>
                        {result.formatted_address}
                     </p>
                  </ListGroup.Item>
               ))}
            </ListGroup>
         </Card>
      </div>
   )
}

export default MapSearchBar
