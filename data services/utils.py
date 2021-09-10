from dateutil import parser
import json
import os

def get_date(dt_str):
    """
    function to parse iso_format date string to python's native datetime
    
    :params: iso_format date string
    
    :returns: datetime object
    """
    return parser.parse(dt_str)

def get_static_data(_file, return_dictionary):
    """
    function to create data objects from local directory
    
    :params: 
        _file, a string representing the filename to lookup in the local directory
        return_dictionary, boolean argument to return dataset as a dictionary
        if false returns dataset as a list object

    :returns: dataset as a list or dictionary object
    """
    filename = os.path.join('data', _file)

    with open(filename) as f:
        data = json.load(f)
    
    data_dictionary = dict()
    if return_dictionary:
        for d in data:
            data_dictionary[d["id"]] = d
        return data_dictionary
    else:
        return data
