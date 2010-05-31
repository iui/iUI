import re

# Refreshes the iUI HTML documentation (iui_docs.html), regenerating it from the
# code comments in iui.js
def refresh():
  # read in the comments from iui.js
  iui_source = open('../web-app/iui/iui.js')
  comments_list = get_multiline_comments(iui_source.read())
  comments_list = [convert_to_html(comment) for comment in comments_list]
  comments_dict = {}
  for html, type in comments_list:
    if not comments_dict.has_key(type):
      comments_dict[type] = []
    comments_dict[type].append(html)
  iui_source.close()
  
  # write out the comments into a documentation html file
  docs_dest = open('iui_docs.html', 'w')
  docs_dest.write("""<!DOCTYPE html>
  <html>
    <head>
      <title>iUI Documentation</title>
      <link href="iui_docs.css" rel="stylesheet" type="text/css">
    </head>
    <body>
    <h1>iUI Documentation</h1>
    """)
  docs_dest.write('\n'.join(comments_dict['copyright']))
  docs_dest.write('\n'.join(comments_dict['note']))
  docs_dest.write('<h2>Event Handling</h2>')
  docs_dest.write('\n'.join(comments_dict['load']))
  docs_dest.write('\n'.join(comments_dict['click']))
  docs_dest.write('<h2>Properties</h2>')
  docs_dest.write('\n'.join(comments_dict['property']))
  docs_dest.write('<h2>Methods</h2>')
  docs_dest.write('\n'.join(comments_dict['method']))
  docs_dest.write('\n</body>')
  docs_dest.close()


# Regex-helpers that make regex code more readable, like pyparsing
def literal(lit_str): return lit_str.replace('*', '\\*').replace('.', '\\.')
def capture(regex_str): return '(' + regex_str + ')'
anything = '.*?' # non-greedy
start = '^'
end = '$'
line_end = '\n'
whitespace = '\\s*?' # non-greedy
number = '\\d'
word = '[a-z]+'
link_characters = '[a-z0-9/\.-]+'


# uber-simple (stupid) parser that plucks out the JS multi-line comments
# this parsing is so stupid, it wouldn't realize that the below lines are not
# genuine multiline comments b/c they're contained in strings
multiline_comment = re.compile(literal('/*') + anything + literal('*/'), re.DOTALL)
def get_multiline_comments(js_source):
  def strip_comment_marks(string): return string[2:-2]
  return [strip_comment_marks(match) for match in multiline_comment.findall(js_source)]


# Converts a clean code-comment-friendly syntax (a simplified version of ReST)
# into HTML.
blankline = re.compile(line_end + whitespace + line_end)
heading = re.compile(start + whitespace + capture(word) + ':' + capture(anything) + end, re.MULTILINE | re.I)
note = re.compile(start + whitespace + 'note:' + capture(anything) + end, re.DOTALL | re.I)
hyperlink = re.compile(capture('http://' + link_characters), re.I)
numbers = re.compile(start + number + literal('.'), re.MULTILINE)
inline_code = re.compile('`' + capture(anything) + '`')

def convert_to_html(comment):
  html = []
  sections = blankline.split(comment)
  heading_match = heading.match(sections[0].lstrip())
  comment_type = ''
  if heading_match:
    comment_type = heading_match.group(1)
  
  for section in sections:
    html.append('<p>')
    section = note.sub('<div class="note">\\1</div>', section)
    if section.lstrip().startswith('example:'):
      section = '<pre>' + section.strip()[len('example:'):] + '</pre>'
    section = heading.sub('<h3>\\2</h3>', section)
    section = inline_code.sub('<span class="code">\\1</span>', section)
    section = hyperlink.sub('<a href="\\1">\\1</a>', section)

    if comment_type == 'copyright':
      section = '<i>' + section + '</i>'
    if section.lstrip().startswith('1.'):
      section = '<ol><li>' + numbers.sub('</li><li>', section.lstrip()[2:]) + '</li></ol>'
    
    html.append(section)
    html.append('</p>')
  return ('\n'.join(html), comment_type)


if __name__ == '__main__':
  refresh()