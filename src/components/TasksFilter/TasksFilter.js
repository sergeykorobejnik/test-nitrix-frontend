import React from 'react';
import styled from "styled-components";
import {useDispatch} from "react-redux";
import {clearFilter, filterBy} from "../../redux/actions/actions";

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;
  @media only screen and (min-width: 1280px) {
    margin-bottom: 40px;
  }
  span {
    display: block;
    width: 100%;
    margin-bottom: 20px;
    font-size: 16px;
    @media only screen and (min-width: 1280px) {
      font-size: 24px;
    }
  }
  .filter-button {
    margin: 0;
    font-size: 16px;
    @media only screen and (min-width: 1280px) {
      font-size: 24px;
    }
  }
  .filter-button + .filter-button {
    margin-left: 10px;
    @media only screen and (min-width: 1280px) {
      margin-left: 20px;
    }
  }
`

const TasksFilter = props => {

    const dispatch = useDispatch()

    return (
        <FilterContainer>
            <span>FILTER BY: </span>
            <button className="filter-button"
                    onClick={() => dispatch(filterBy('pending'))}
            >Pending</button>
            <button className="filter-button"
                    onClick={() => dispatch(filterBy('complete'))}
            >Complete</button>

            <button className="filter-button"
                    onClick={() => dispatch(clearFilter())}
            >Clear filters</button>
        </FilterContainer>
    );
};

export default TasksFilter;