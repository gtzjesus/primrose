import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import { useNavigate } from 'react-router-dom';
import GoToTop from '../GoToTop';

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/search/?query=${query}` : '/search');
  };

  return (
    <Form onSubmit={submitHandler}>
      <InputGroup>
        <Button variant="outline-primary" type="submit" id="button-search">
          <i className="">Search</i>
        </Button>
      </InputGroup>
      <GoToTop />
    </Form>
  );
}
