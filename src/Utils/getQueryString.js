import queryStr from "query-string";

export default function getqueryParams(queryString) {
  return queryStr.parse(queryString);
}
