/**
 * Created by knut on 14-12-11.
 */
import { select } from 'd3';
import db from './infoDb';
import infoParser from './parser/info';
import { log } from '../../logger';

const conf = {};
export const setConf = function (cnf) {
  const keys = Object.keys(cnf);

  keys.forEach(function (key) {
    conf[key] = cnf[key];
  });
};

/**
 * Draws a an info picture in the tag with id: id based on the graph definition in text.
 * @param text
 * @param id
 */
export const draw = (txt, id, ver) => {
  try {
    const parser = infoParser.parser;
    parser.yy = db;
    log.debug('Renering info diagram\n' + txt);
    // Parse the graph definition
    parser.parse(txt);
    log.debug('Parsed info diagram');
    // Fetch the default direction, use TD if none was found
    const svg = select('#' + id);

    const g = svg.append('g');

    g.append('text') // text label for the x axis
      .attr('x', 100)
      .attr('y', 40)
      .attr('class', 'version')
      .attr('font-size', '32px')
      .style('text-anchor', 'middle')
      .text('v ' + ver);

    svg.attr('height', 100);
    svg.attr('width', 400);
    // svg.attr('viewBox', '0 0 300 150');
  } catch (e) {
    log.error('Error while rendering info diagram');
    log.error(e.message);
  }
};

export default {
  setConf,
  draw,
};
