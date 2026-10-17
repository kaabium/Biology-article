"""Helpers for the curriculum plan. A term spec is a string:
    "id; Display term; alias1, alias2, ...; category; flags"
flags: P = 'paper' kind (definition is about how THIS paper uses it; otherwise 'background'),
       cs = case-sensitive matching (all-caps abbreviations that could collide with ordinary words).
Aliases are the other surface forms that the app auto-links and that the validator looks for
(plural forms 's'/'es' are matched automatically)."""

CATS = {'bio': 'biology', 'can': 'cancer', 'lab': 'lab', 'scr': 'screen', 'aso': 'aso', 'seq': 'seq',
        'sta': 'stats', 'pap': 'paper', 'fig': 'figures', 'gen': 'general'}


def term(spec, home):
    parts = [p.strip() for p in spec.split(';')]
    while len(parts) < 5:
        parts.append('')
    tid, disp, aliases, cat, flags = parts[:5]
    fl = set(f.strip() for f in flags.split(',') if f.strip())
    return {
        'id': tid,
        'term': disp,
        'aliases': [a.strip() for a in aliases.split(',') if a.strip()],
        'cat': CATS.get(cat, cat) or 'general',
        'kind': 'paper' if 'P' in fl else 'background',
        'cs': 'cs' in fl,
        'taughtIn': home,
    }


def L(id, title, minutes, prereqs, goal, terms=(), notes=''):
    return {
        'id': id, 'track': id[0], 'title': title, 'minutes': minutes, 'prereqs': list(prereqs), 'goal': goal,
        'teaches': [term(t, id) for t in terms], 'notes': notes,
    }
