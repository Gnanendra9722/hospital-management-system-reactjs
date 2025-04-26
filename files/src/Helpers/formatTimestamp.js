export const formatTimestamp = (timestamp, format = 'YYYY-MM-DD HH:mm:ss')=> {
    const date = new Date(timestamp);
    
    const map = {
      'YYYY': date.getFullYear(),
      'MM': String(date.getMonth() + 1).padStart(2, '0'), // Months are 0-based, so add 1
      'DD': String(date.getDate()).padStart(2, '0'),
      'HH': String(date.getHours()).padStart(2, '0'),
      'mm': String(date.getMinutes()).padStart(2, '0'),
      'ss': String(date.getSeconds()).padStart(2, '0')
    };
  
    // Replace the placeholders with respective values
    return format.replace(/YYYY|MM|DD|HH|mm|ss/g, (match) => map[match]);
  };
  