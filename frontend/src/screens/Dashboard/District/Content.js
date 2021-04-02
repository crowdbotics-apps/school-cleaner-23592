import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { fetchDistricts } from '../../../modules/actions/DistrictActions';
import District from '../../../components/Dashboard/District';
import DistrictForm from '../../../components/Dashboard/DistrictForm';
import DistrictEditForm from '../../../components/Dashboard/DistrictEditForm';

const Content = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  
  useEffect(() => {
    dispatch(fetchDistricts());
  }, []);


  const { fetchDistricts: { loading, success, error, data }} = useSelector(({ district }) => district);
  const [ editedDistrict, setEditedDistrict ] = useState({name: '', logo: '', code: ''})
  const [ showForm, setShowForm ] = useState(false)
  const [ selectedDistrict, setSelectedDistrict ] = useState(0)

  const selectDistrict = ({ target: {id}}) => {
    let updatedDistrict = data.filter(district => district.id == id)[0]

    setSelectedDistrict(updatedDistrict.id)
    props.onDistrictSelected(updatedDistrict);
  }

  const editFormHandler = district => {

    setEditedDistrict({ name: district.name, logo: district.logo, code: district.code });
    setShowForm(true);
  };

  return (
    <React.Fragment>
      <div className="main-content w-100 p-4">
        <div className="district-holder">
          {data.length > 0 && data.map(district => {
            return (
                    <District 
                      key={district.id}
                      district={district} 
                      selected={selectedDistrict}
                      onSelectDistrict={selectDistrict} 
                      onEditDistrict={editFormHandler}
                    />
                  ); 
          })}
        </div>
      </div>
      <DistrictForm />
      {showForm && <DistrictEditForm district={editedDistrict} />}
    </React.Fragment>
  )
}

export default Content;
